package TicketManager.Service;

import TicketManager.DTO.Reponse.AuthenticationRes;
import TicketManager.DTO.Reponse.IntrospecReponse;
import TicketManager.DTO.Reponse.UserReponse;
import TicketManager.DTO.Request.IntrospecRequest;
import TicketManager.DTO.Request.UserCreateRequest;
import TicketManager.DTO.Request.UserLoginGG;
import TicketManager.DTO.Request.UserLoginReq;
import TicketManager.Entity.Role;
import TicketManager.Entity.User;
import TicketManager.Enum.ErrorCode;
import TicketManager.Enum.roleEnum;
import TicketManager.Exception.AppException;
import TicketManager.Repository.RoleRepository;
import TicketManager.Repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    @NonFinal
    @Value("${jwt.signerKey}")
    String SIGNER_KEY;
    final RoleRepository roleRepository;
    final UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public IntrospecReponse introspec(IntrospecRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        return IntrospecReponse.builder()
                .valid(verified && expityTime.after(new Date()))
                .build();

    }

    public AuthenticationRes createUser(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (userRepository.existsByUsername(request.getUserName())) throw new AppException(ErrorCode.USERNAME_EXISTED);


        User user = new User();
        user.setUsername(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(true);
        user.setCreateAt(Timestamp.from(Instant.now()));
        Role role = roleRepository.findAllByName(String.valueOf(roleEnum.USER));
        if (role == null) {
            role = roleRepository.save(Role.builder()
                    .id(1)
                    .name(String.valueOf(roleEnum.USER))
                    .build());
        }
        user.setRole(role);
        userRepository.save(user);
        var token = generateToken(request.getEmail(), user.getRole().getName(),user.getUsername());

        return AuthenticationRes.builder()
                .authenticated(true)
                .token(token)
                .authenticated(true)
                .build();
    }

    public AuthenticationRes login(UserLoginReq req) {
        var user = userRepository.findUserByEmail(req.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        boolean matchesPassword = passwordEncoder.matches(req.getPassword(), user.getPassword());
        if (!matchesPassword) throw new AppException(ErrorCode.UNAUTHENTICATEDPW);
        var token = generateToken(req.getEmail(), user.getRole().getName(),user.getUsername());

        return AuthenticationRes.builder()
                .authenticated(true)
                .token(token)
                .role(user.getRole().getName())
                .authenticated(true)
                .build();
    }

    //Sinh ra token
    public String generateToken(String email,String role,String userName) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); // header là thuật toán sử dụng

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(email)
                .issuer("TicketRunning.com")
                .issueTime(new Date()) // thời gian bd
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                )) // thời hạn (hiện đang là 1 giờ)
                .claim("role", role)
                .claim("username",userName)
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes())); //dùng để ký (MACSigner là khóa đối xứng)
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create Token:", e);
            throw new RuntimeException(e);
        }
    }

    //        Xóa User
    public User deleteUser(String idUser) {
        User user = userRepository.findUserById(UUID.fromString(idUser))
                .orElseThrow(() -> new AppException(ErrorCode.UNACCOUNT));
        user.setStatus(false);
        return userRepository.save(user);
    }
    //Lấy thong tin tat ca user
    public List<User> listUser(){
        return userRepository.findAll();
    }
    //ấy thông tin 1 user theo id
    public User findUserById(String id){
        return userRepository.findUserById(UUID.fromString(id))
                .orElseThrow(() -> new AppException(ErrorCode.UNACCOUNT));
    }
    public User getInfor() {
        var context = SecurityContextHolder.getContext();
        System.out.println(context);
        String email = context.getAuthentication().getName();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return user;
    }
    //Login GG vs Face
    public AuthenticationRes processOAuthLogin(UserLoginGG user) {
        String email = user.getEmail();
        String name = user.getUsername();
        if(!userRepository.existsByEmail(email)){
            User user1 = new User();
            user1.setEmail(email);
            user1.setUsername(name);
            user1.setStatus(true);
            user1.setCreateAt(Timestamp.from(Instant.now()));
            Role role = roleRepository.findAllByName(String.valueOf(roleEnum.USER));
            if (role == null) {
                role = roleRepository.save(Role.builder()
                        .id(1)
                        .name(String.valueOf(roleEnum.USER))
                        .build());
            }
            user1.setRole(role); // Mặc định role là USER

            // Lưu user vào database
            userRepository.save(user1);
            var token = generateToken(user1.getEmail(), user1.getRole().getName(),user1.getUsername());
            return AuthenticationRes.builder()
                    .authenticated(true)
                    .token(token)
                    .role(user1.getRole().getName())
                    .authenticated(true)
                    .build();
        }else{
            User u = userRepository.findUserByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            var token = generateToken(u.getEmail(), u.getRole().getName(),u.getUsername());
            return AuthenticationRes.builder()
                    .authenticated(true)
                    .token(token)
                    .role(u.getRole().getName())
                    .authenticated(true)
                    .build();
        }
    }
}
