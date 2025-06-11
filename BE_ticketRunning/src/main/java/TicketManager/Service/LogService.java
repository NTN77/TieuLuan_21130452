package TicketManager.Service;

import TicketManager.Entity.Log;
import TicketManager.Entity.User;
import TicketManager.Repository.LogRepository;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LogService {
    final LogRepository logRepository;
    public List<Log> findAll(){
        return logRepository.findAll();
    }

    public Log saveLog( String action,User idUser, String detail){
        Log log1 = new Log();
        log1.setAction(action);
        log1.setCreateAt(LocalDateTime.now());
        log1.setDetail(detail);
        log1.setIdUser(idUser);
        return logRepository.save(log1);
    }
}
