package edu.icet.ha.service.impl;

import edu.icet.ha.dto.AuctionItem;
import edu.icet.ha.entity.AuctionItemEntity;
import edu.icet.ha.repository.AuctionItemRepository;
import edu.icet.ha.service.AuctionItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuctionItemServiceImpl implements AuctionItemService {

    final private AuctionItemRepository repository;
    final private ModelMapper modelMapper;


    @Override
    public AuctionItem add(AuctionItem item) {
        AuctionItemEntity entity = modelMapper.map(item, AuctionItemEntity.class);
        AuctionItemEntity saved = repository.save(entity);
        return modelMapper.map(saved, AuctionItem.class);
    }

    @Override
    public AuctionItem searchById(Integer id) {
        return repository.findById(id)
                .map(entity -> modelMapper.map(entity, AuctionItem.class))
                .orElse(null);
    }

    @Override
    public List<AuctionItem> searchByName(String name) {
        List<AuctionItemEntity> byName = repository.findByTitle(name);
        List<AuctionItem> auctionItemList = new ArrayList<>();

        byName.forEach(auctionItemEntity->{
            auctionItemList.add(modelMapper.map(auctionItemEntity, AuctionItem.class));
        });
        return auctionItemList;
    }

    @Override
    public List<AuctionItem> getAll() {
        List<AuctionItem> auctionItemList = new ArrayList<>();
        List<AuctionItemEntity> all = repository.findAll();
        all.forEach(auctionItemEntity -> auctionItemList.add(modelMapper.map(auctionItemEntity, AuctionItem.class)));
        return auctionItemList;
    }

    @Override
    public AuctionItem update(Integer id, AuctionItem item) {
        Optional<AuctionItemEntity> optional = repository.findById(id);
        if (optional.isPresent()) {
            AuctionItemEntity updatedEntity = modelMapper.map(item, AuctionItemEntity.class);
            updatedEntity.setId(id);
            AuctionItemEntity saved = repository.save(updatedEntity);
            return modelMapper.map(saved, AuctionItem.class);
        }
        return null;
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
