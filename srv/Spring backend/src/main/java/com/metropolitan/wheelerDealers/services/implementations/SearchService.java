package com.metropolitan.wheelerDealers.services.implementations;

import com.metropolitan.wheelerDealers.DTO.SearchDTO;
import com.metropolitan.wheelerDealers.DTO.SearchResultDTO;
import com.metropolitan.wheelerDealers.repositories.ISearchRepo;
import com.metropolitan.wheelerDealers.services.ISearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService implements ISearchService {
    @Autowired
    private ISearchRepo searchRepo;

    @Override
    public List<SearchResultDTO> defaultSearch() {
        return searchRepo.defaultSearch();
    }

    @Override
    public List<SearchResultDTO> search(SearchDTO searchDTO) {

        return searchRepo.search(searchDTO);
    }
}
