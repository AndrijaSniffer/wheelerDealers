package com.metropolitan.wheelerDealers.controllers;

import com.metropolitan.wheelerDealers.DTO.SearchDTO;
import com.metropolitan.wheelerDealers.DTO.SearchResultDTO;
import com.metropolitan.wheelerDealers.services.ISearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("search")
public class SearchController {
    @Autowired
    private ISearchService searchService;

    @GetMapping
    public ResponseEntity<List<SearchResultDTO>> defaultSearch(){
        List<SearchResultDTO> dto = searchService.defaultSearch();
        return ResponseEntity.ok(dto);
    }

    @PostMapping
//    @PreAuthorize("hasAnyAuthority('admin', 'user')")
    public ResponseEntity<List<SearchResultDTO>> search(@RequestBody SearchDTO searchDTO){
        System.out.println(searchDTO);

        return ResponseEntity.ok(searchService.search(searchDTO));
    }
}
