package TicketManager.Service;

import TicketManager.Util.QRCodeUtil;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
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
    public void sendQRCodeEmail(String to, String subject, String qrData) throws Exception {
        byte[] qrCode = QRCodeUtil.generateQRCodeImage(qrData, 250, 250);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);

        // gửi HTML qua mail
        String html = new String(Files.readAllBytes(new ClassPathResource("templates/email_confirm.html").getFile().toPath()), StandardCharsets.UTF_8);
        html = html.replace("${qrCid}", "qrcode"); // Optional
        helper.setText(html, true);

        helper.addInline("qrcode", new ByteArrayResource(qrCode), "image/png");

        mailSender.send(message);
    }
}
