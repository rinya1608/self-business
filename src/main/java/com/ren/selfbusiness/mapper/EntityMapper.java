package com.ren.selfbusiness.mapper;

public interface EntityMapper<D, E, P> {
    D toDto(E entity);

    E toEntity(P dtoParam);
}
