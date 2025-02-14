package TicketManager.Repository;

import TicketManager.DTO.Reponse.UserReponse;
import TicketManager.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
//    @Query("select u from User u where u.username like %?1% and u.username not like 'admin' and u.status = 1 and u.privacy = true and u.id != ?2")
//    List<User> searchByUsername(String username, UUID UUID);
}
