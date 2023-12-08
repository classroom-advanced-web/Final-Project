package com.example.backend.configurations.converter;

public interface IMapper<E, D> {

    public E toEntity(D obj);

    public D toDTO(E obj);
}
