import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Repository, ObjectLiteral } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query-dto';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Inject Request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    relations?: string[],
  ): Promise<Paginated<T>> {
    const [result, total] = await repository.findAndCount({
      relations: relations,
      skip:
        paginationQuery.page * paginationQuery.limit - paginationQuery.limit,
      take: paginationQuery.limit,
    });

    const totalPages = Math.ceil(total / paginationQuery.limit);

    const baseUrl: string =
      this.request.protocol + '://' + this.request.get('host') + '/';

    const newUrl = new URL(this.request.url, baseUrl);

    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const nextPage =
      paginationQuery.page === total
        ? paginationQuery.page
        : paginationQuery.page + 1;

    return {
      data: result,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: total,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?page=1&limit=${paginationQuery.limit}`,
        last: `${newUrl.origin}${newUrl.pathname}?page=${totalPages}&limit=${paginationQuery.limit}`,
        previous: `${newUrl.origin}${newUrl.pathname}?page=${previousPage}&limit=${paginationQuery.limit}`,
        next: `${newUrl.origin}${newUrl.pathname}?page=${nextPage}&limit=${paginationQuery.limit}`,
        current: `${newUrl.origin}${newUrl.pathname}?page=${paginationQuery.page}&limit=${paginationQuery.limit}`,
      },
    };
  }
}
