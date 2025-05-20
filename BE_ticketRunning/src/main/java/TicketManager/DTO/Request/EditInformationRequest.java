package TicketManager.DTO.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EditInformationRequest {
    String newName;
    String email;
    UUID idUser;
    int idRole;
    UUID idAdmin;
}
