package TicketManager.Configuration;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dspmhr61d",
                "api_key", "435225665828672",
                "api_secret", "PV-TAH2owaaUfDOSYk5hrCkpMoU"
        ));
    }
}
