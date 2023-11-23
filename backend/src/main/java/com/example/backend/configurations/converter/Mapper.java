package com.example.backend.configurations.converter;

public interface Mapper<E, D> {

    public E toEntity(D obj);

    public D toDTO(E obj);
}
