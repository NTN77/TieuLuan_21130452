package TicketManager.Repository;

import TicketManager.Entity.BTC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BTCRepository extends JpaRepository<BTC, UUID> {
    boolean existsBTCByName(String name);
}
