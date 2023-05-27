package com.metropolitan.wheelerDealers.repositories;

import com.metropolitan.wheelerDealers.DTO.SearchDTO;
import com.metropolitan.wheelerDealers.DTO.SearchResultDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchRepo implements ISearchRepo {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SearchResultDTO> search(SearchDTO searchDTO) {

        StringBuilder sql = new StringBuilder("SELECT DISTINCT `id_car`, `id_user`, `price`, c.`color`, `chassie_number`, `is_preowned`, `created_at`, c.`id_fuel`, `fuel_name`, `kml`, c.`id_model`, `name_model`, `year_of_manufacture`, mo.`id_manufacturer`, `name_manufacturer` " +
                "FROM `car` c, `fuel` f, `model` mo, `manufacturer` ma, `transmission` t, `drive` d, `engine` e, `interior` i " +
                "WHERE c.id_fuel = f.id_fuel and c.id_model = mo.id_model and mo.id_manufacturer = ma.id_manufacturer;");

        //region Basic parameters SQL
        if (searchDTO.getIdManufacturer() != null)
            sql.append(" and ma.id_manufacturer = ").append(searchDTO.getIdManufacturer());

        if (searchDTO.getIdModel() != null)
            sql.append(" and mo.id_model = ").append(searchDTO.getIdModel());

        if (searchDTO.getIdTransmission() != null)
            sql.append(" and t.id_transmission = ").append(searchDTO.getIdTransmission());

        if (searchDTO.getIdFuel() != null)
            sql.append(" and f.id_fuel = ").append(searchDTO.getIdFuel());

        if (searchDTO.getIdDrive() != null)
            sql.append(" and d.id_drive = ").append(searchDTO.getIdDrive());

        if (searchDTO.getVolume() != null)
            sql.append(" and d.id_drive = ").append(searchDTO.getVolume());

        if (searchDTO.getCarColor() != null)
            sql.append(" and c.color = ").append(searchDTO.getCarColor());

        if (searchDTO.getLeftSideSteeringWheel() != null)
            sql.append(" and i.left_side_steering_wheel = ").append(searchDTO.getLeftSideSteeringWheel());
        //endregion

        //region Price parameter SQL
        if (searchDTO.getPriceFrom() != null && searchDTO.getPriceTo() != null)
            sql.append(" and c.price is between ").append(searchDTO.getPriceFrom()).append(" and ").append(searchDTO.getPriceTo());
        else if (searchDTO.getPriceFrom() != null)
            sql.append(" and c.price > ").append(searchDTO.getPriceFrom());
        else if (searchDTO.getPriceTo() != null)
            sql.append(" and c.price < ").append(searchDTO.getPriceTo());
        //endregion

        //region Horsepower parameter SQL
        if (searchDTO.getHpFrom() != null && searchDTO.getHpTo() != null)
            sql.append(" and e.horsepower is between ").append(searchDTO.getHpFrom()).append(" and ").append(searchDTO.getHpTo());
        else if (searchDTO.getHpFrom() != null)
            sql.append(" and e.horsepower > ").append(searchDTO.getHpFrom());
        else if (searchDTO.getHpTo() != null)
            sql.append(" and e.horsepower < ").append(searchDTO.getHpTo());
        //endregion

        //region Kilowatt parameter SQL
        if (searchDTO.getKwFrom() != null && searchDTO.getKwTo() != null)
            sql.append(" and e.kilowatt is between ").append(searchDTO.getKwFrom()).append(" and ").append(searchDTO.getKwTo());
        else if (searchDTO.getKwFrom() != null)
            sql.append(" and e.kilowatt > ").append(searchDTO.getKwFrom());
        else if (searchDTO.getKwTo() != null)
            sql.append(" and e.kilowatt < ").append(searchDTO.getKwTo());
        //endregion

        System.out.println(sql);
        Query query = entityManager.createNativeQuery(sql.toString());

//        List<SearchResultDTO> list = query.getResultList();
//
//        for (int i = 0; i < list.size(); i++) {
//            System.out.println(list.get(i));
//        }

        return query.getResultList();
    }
}
