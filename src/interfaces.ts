// Все значения лежат по таким же ключам, как в приходящем массиве
// Хоть это и "некрасиво", я просто не хотел переписывать все компоненты, где они используются.
// Все из-за того, что в приложении на Реакте я просто делал копию всего этого массива со
// всеми значениями внутри, а не "отбирал" только нужные
export interface IOrg {
  value: string
  data: {
    inn: string
    kpp: string
    ogrn: string
    address: {
      data: {
        region_with_type: string
      }
      unrestricted_value: string
    }
    type: string
    management: {
      post?: string
      name?: string
    }
    opf: {
      full: string
    }
    name: {
      full: string
    }
  }
}
