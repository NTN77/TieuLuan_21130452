package TicketManager.Service;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
@Data
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MailService {
    private UserService userService;
    private final JavaMailSender mailSender;
    @NonFinal
    @Value("${spring.mail.username}")
    String FROM_EMAIL;
    public void sendEmail(String to, String subject , String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom(FROM_EMAIL);
        mailSender.send(message);
    }
    public int code(){
        Random random = new Random();
        int randomNumber = 1000 + random.nextInt(9000);
        return randomNumber;
    }
}
