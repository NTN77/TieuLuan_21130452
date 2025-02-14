package TicketManager.Repository;

import TicketManager.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findAllByName(String name);
}
