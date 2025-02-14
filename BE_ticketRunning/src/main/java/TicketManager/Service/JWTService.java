package TicketManager.Service;//package TicketManager.Service;
//
//import TicketManager.Entity.User;
//import com.nimbusds.jwt.JWTClaimsSet;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//@Service
//public class JWTService {
//
//    @Value("${jwt.signerKey}")
//    private String SIGNER_KEY;
//
//    // Tạo token JWT cho người dùng
//    public String generateToken(User user) {
//        JWTClaimsSet Jwts = new JWTClaimsSet.Builder()
//                .subject(user.getEmail())
//                .issuer(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token sống trong 1 ngày
//                .signWith(SignatureAlgorithm.HS512, SIGNER_KEY.getBytes())
//                .compact();
//    }
//
//    // Giải mã token và lấy thông tin người dùng từ token
//    public String getUserEmailFromToken(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(SIGNER_KEY.getBytes())
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//
//}
