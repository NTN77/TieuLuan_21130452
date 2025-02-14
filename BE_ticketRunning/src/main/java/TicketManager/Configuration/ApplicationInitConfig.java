package TicketManager.Configuration;

import TicketManager.Entity.Role;
import TicketManager.Entity.User;
import TicketManager.Enum.roleEnum;
import TicketManager.Repository.RoleRepository;
import TicketManager.Repository.UserRepository;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;

@Configuration
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;
    @Bean(name = "initApplication")
    ApplicationRunner applicationInitConfig(UserRepository userRepository){
        return arg -> {
            if(userRepository.findUserByUsername("admin").isEmpty()){
                Role role = roleRepository.findAllByName(String.valueOf(roleEnum.ADMIN));
                if (role == null) {
                    role = roleRepository.save(Role.builder()
                            .id(0)
                            .name(String.valueOf(roleEnum.ADMIN))
                            .build());
                }
                User user = User.builder()
                        .username("admin")
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("admin"))
                        .birthDate(null)
                        .status(true)
                        .createAt(Timestamp.from(Instant.now()))
                        .role(role)
                        .build();
                userRepository.save(user);
            }
        };
    }
}
