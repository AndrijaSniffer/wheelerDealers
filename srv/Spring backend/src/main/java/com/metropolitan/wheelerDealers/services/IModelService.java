package com.metropolitan.wheelerDealers.services;

import com.metropolitan.wheelerDealers.entities.Model;

import java.util.List;

public interface IModelService {
    List<Model> getAllModels();
    boolean createOrUpdateModel(Model model);
    Model getModelById(Integer id);
    void deleteModel(Integer id);
}
