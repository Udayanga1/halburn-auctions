package edu.icet.ha.dto;

import edu.icet.ha.util.AuctionStatusType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AuctionItem {
    private Integer id;
    private String title;
    private String description;
    private Double price;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer sellerId;
    private Integer categoryId;

    @Enumerated(EnumType.STRING)
    private AuctionStatusType type;
}
