package edu.icet.ha.service;

import edu.icet.ha.dto.AuctionItem;

import java.util.List;

public interface AuctionItemService {
    AuctionItem add(AuctionItem item);
    AuctionItem searchById(Integer id);
    List<AuctionItem> searchByName(String name);
    List<AuctionItem> getAll();
    AuctionItem update(Integer id, AuctionItem item);
    void delete(Integer id);
}
