package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.DTO.SearchDTO;
import com.metropolitan.wheelerDealers.DTO.SearchResultDTO;

import java.util.List;

public interface ISearchRepo {
    List<SearchResultDTO> defaultSearch();
    List<SearchResultDTO> search(SearchDTO searchDTO);
}