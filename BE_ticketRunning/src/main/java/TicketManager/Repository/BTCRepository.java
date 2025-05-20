package TicketManager.Repository;

import TicketManager.Entity.BTC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface BTCRepository extends JpaRepository<BTC, UUID> {
    boolean existsBTCByName(String name);

    @Query("SELECT c FROM BTC c WHERE c.status = true")
    public List<BTC> getAll();
    @Transactional
    @Modifying
    @Query("UPDATE BTC b SET b.status = :status WHERE b.id = :idBTC")
    int updateStatus(@Param("idBTC") UUID idBTC, @Param("status") boolean status);

    @Transactional
    @Modifying
    @Query("update BTC b set b.name = :name,b.urlImage = :urlImage WHERE b.id = :id")
    int updateBTC(@Param("name") String nameBTC , @Param("urlImage") String url , @Param("id") UUID id);
    @Transactional
    @Modifying
    @Query("update BTC b set b.name = :name WHERE b.id = :id")
    int updateBTC(@Param("name") String nameBTC , @Param("id") UUID id);

}
