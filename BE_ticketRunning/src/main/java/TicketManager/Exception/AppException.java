package TicketManager.Exception;

import TicketManager.Enum.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppException extends RuntimeException{
   final ErrorCode errorCode;
}
