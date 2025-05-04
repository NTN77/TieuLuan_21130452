package TicketManager.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;
    private final String[] PUBLIC_ENDPOINTS_POST = {
            "/user","/user/{id}","/user/SignIn/sendCode"
            ,"/auth/token","/auth/introspect",
            "/auth/loginGG","/auth/facebook",
            "/images/upload","/signUpEvent/customerInformation","/Event/Payment/vn-pay",
            "/user/changeInformation"},
            PUBLIC_ENDPOINTS_GET = {"/event/findByName","/event/eventHome","/event/eventAll",
            "/event/eventTop6Sell","/event/BTC","/event/search","/event/filter","/event/eventDetail",
            "/Event/Payment/vn-pay-callback","/information/listEventSignIn"},
    ENDPOINTS_GET_ADMIN = {"/user/allUser","/admin/dashboard/dataDashBoard","/admin/findByUser/{id}","/admin/allEvent","/admin/eventDetail","/admin/orderManagerEvent","/admin/allCustomerOfEvent","/admin/exportCustomers"}, // endpoint dành riêng cho admin
    ENDPOINTS_POST_ADMIN = { "/event/createEvent","/event/addBTC","/admin/updateStatus","/admin/updateInformation","/admin/updateStatusEvent","/admin/editEvent","/admin/updateBibAndSendMail","/admin/editInformationSignIn"}; // endpoint dành riêng cho admin


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.authorizeHttpRequests(request ->
                request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS_POST)
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS_GET)
                        .permitAll()
                        .requestMatchers(HttpMethod.GET,ENDPOINTS_GET_ADMIN).hasAnyAuthority("ROLE_ADMIN","ROLE_MANAGER")
                        .requestMatchers(HttpMethod.POST,ENDPOINTS_POST_ADMIN).hasAnyAuthority("ROLE_ADMIN","ROLE_MANAGER")
                        .anyRequest().authenticated()); // các endpoint còn lại phải đăng nhập

            httpSecurity.oauth2ResourceServer(
                oauth2 -> oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
        );
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(cors -> cors.configure(httpSecurity));
        return httpSecurity.build();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //Cấu hinình CORS
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Cho phép frontend gọi API
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwt -> {
            JwtGrantedAuthoritiesConverter defaultConverter = new JwtGrantedAuthoritiesConverter();
            defaultConverter.setAuthorityPrefix("");

            // Lấy quyền mặc định từ scope (nếu có)
            var authorities = defaultConverter.convert(jwt);

            // 🔹 Lấy ROLE từ claim "ROLE"
            String role = jwt.getClaimAsString("role");

            if (role != null) {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
            }

            return authorities;
        });

        return jwtAuthenticationConverter;
    }


}
