package edu.icet.ha.controller;

import edu.icet.ha.dto.AuctionItem;
import edu.icet.ha.service.AuctionItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auction")
@CrossOrigin
@RequiredArgsConstructor
public class AuctionItemController {

    final AuctionItemService service;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody AuctionItem item) {
        AuctionItem created = service.add(item);
        if (created != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Auction Created");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Create Auction");
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionItem> searchById(@PathVariable Integer id) {
        AuctionItem item = service.searchById(id);
        return item != null ?
                ResponseEntity.ok(item) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<AuctionItem>> getAll() {
        List<AuctionItem> list = service.getAll();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id, @RequestBody AuctionItem item) {
        AuctionItem updated = service.update(id, item);
        if (updated != null) {
            return ResponseEntity.ok("Auction Updated");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Auction Not Found");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        try {
            service.delete(id);
            return ResponseEntity.ok("Auction Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Auction Not Found");
        }
    }
}