package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.DTO.SearchDTO;
import com.metropolitan.wheelerDealers.DTO.SearchResultDTO;

import java.util.List;

public interface ISearchService {

    List<SearchResultDTO> defaultSearch();

    List<SearchResultDTO> search(SearchDTO searchDTO);
}
