package edu.icet.ha.repository;

import edu.icet.ha.entity.AuctionItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionItemRepository extends JpaRepository<AuctionItemEntity, Integer> {
    List<AuctionItemEntity> findByTitle(String name);
}
