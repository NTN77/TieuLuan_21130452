package TicketManager.Repository;

import TicketManager.DTO.Reponse.UserReponse;
import TicketManager.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);

    boolean existsByUsername(String userName);

    boolean existsByPassword(String password);

    boolean existsById(UUID id);

    Optional<User> findUserById(UUID id);

    Optional<User> findUserByUsername(String userName);

    Optional<User> findUserByEmail(String email);

    //    change Name of user
    @Modifying
    @Query("UPDATE User u SET u.username = :newUserName , u.updateAt = CURRENT_TIMESTAMP WHERE u.id = :idUser")
    int updateName(@Param("newUserName") String newUserName, @Param("idUser") UUID idUser);
    @Modifying
    @Query("UPDATE User u SET u.status = :status , u.updateAt = CURRENT_TIMESTAMP WHERE u.id = :idUser")
    int updateStatus(@Param("idUser") UUID idUser,@Param("status") boolean status);
    @Modifying
    @Query("UPDATE User u SET u.username = :newName,u.email =:email,u.role.id =:idRole, u.updateAt = CURRENT_TIMESTAMP WHERE u.id = :idUser")
    int updateInformation(@Param("idUser") UUID idUser,@Param("newName") String newName,@Param("email") String email, @Param("idRole") int idRole );

}
