"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  services: [{
    _id: '111111111111111111111111',
    name: 'Обязательный аудит',
    category: 'Аудиторские услуги',
    description: `Обязательный аудит - ежегодная предусмотренная действующим законодательством обязательная аудиторская проверка бухгалтерской отчетности и других документов организации или индивидуального предпринимателя с целью оценки достоверности бухгалтерской отчетности за аудируемый год и соответствия совершенных финансовых и хозяйственных операций законодательству Республики Беларусь.
                          Масштаб, содержание и характер аудита определяются в зависимости от качества и действенности системы внутреннего контроля в организации, состояния бухгалтерского учета и других факторов, дающих возможность составления мнения и на его основе выдачи достоверного аудиторского заключения.`,
    includingServices: `оценка уровня организации бухгалтерского учета и системы внутреннего контроля, качества организации документооборота и обработки документации, формируемой на предприятии;<br>
                                оценка правильности отражения на счетах бухгалтерского учета хозяйственных операции и финансовых результатов деятельности организации;<br>
                                выработка рекомендаций по устранению выявленных в ходе проверки ошибок и нарушений, оказавших влияние на формирование финансовых результатов деятельности организации.`,
    price: 1800,
    numReview: 10,
    rating: 1
  }, {
    _id: '222222222222222222222222',
    name: 'Инициативный аудит',
    category: 'Аудиторские услуги',
    description: 'Бухгалтерским службам организаций сегодня требуется обеспечить ведение и бухгалтерского, и налогового учета. Учитывая, что формирование абсолютно самостоятельной системы налогового учета, не связанной с бухгалтерским учетом, на наш взгляд, не является рациональным и приводит к многократному дублированию учетных операций, мы предлагаем использовать систему, при которой максимальный объем информации, необходимый для формирования налоговых регистров, может быть получен на основе данных бухгалтерского учета.',
    includingServices: `Налоговый аудит - выполнение работ по специальному аудиторскому заданию по выражению мнения о соответствии порядка формирования, 
                                отражения в учете и уплаты экономическим субъектом налогов и других платежей в бюджет и внебюджетные фонды по нормам, установленным 
                                законодательством; Постановка системы налогового учета, разработка учетной политики для целей налогообложения;<br> 
                                Консультирование по вопросам налогообложения;<br> 
                                Представление интересов клиента в ходе проверок налоговыми и иными контролирующими органами.`,
    price: 2000,
    numReview: 7,
    rating: 2
  }, {
    _id: '333333333333333333333333',
    name: 'Налоговый аудит',
    category: 'Аудиторские услуги',
    description: 'Бухгалтерским службам организаций сегодня требуется обеспечить ведение и бухгалтерского, и налогового учета. Учитывая, что формирование абсолютно самостоятельной системы налогового учета, не связанной с бухгалтерским учетом, на наш взгляд, не является рациональным и приводит к многократному дублированию учетных операций, мы предлагаем использовать систему, при которой максимальный объем информации, необходимый для формирования налоговых регистров, может быть получен на основе данных бухгалтерского учета.',
    includingServices: `Налоговый аудит - выполнение работ по специальному аудиторскому заданию по выражению мнения о соответствии порядка формирования, 
                                отражения в учете и уплаты экономическим субъектом налогов и других платежей в бюджет и внебюджетные фонды по нормам, установленным 
                                законодательством; Постановка системы налогового учета, разработка учетной политики для целей налогообложения;<br> 
                                Консультирование по вопросам налогообложения;<br> 
                                Представление интересов клиента в ходе проверок налоговыми и иными контролирующими органами.`,
    price: 1900,
    numReview: 8,
    rating: 3
  }, {
    _id: '444444444444444444444444',
    name: 'Управленческий аудит',
    category: 'Аудиторские услуги',
    description: 'Бухгалтерским службам организаций сегодня требуется обеспечить ведение и бухгалтерского, и налогового учета. Учитывая, что формирование абсолютно самостоятельной системы налогового учета, не связанной с бухгалтерским учетом, на наш взгляд, не является рациональным и приводит к многократному дублированию учетных операций, мы предлагаем использовать систему, при которой максимальный объем информации, необходимый для формирования налоговых регистров, может быть получен на основе данных бухгалтерского учета.',
    includingServices: `Налоговый аудит - выполнение работ по специальному аудиторскому заданию по выражению мнения о соответствии порядка формирования, 
                                отражения в учете и уплаты экономическим субъектом налогов и других платежей в бюджет и внебюджетные фонды по нормам, установленным 
                                законодательством; Постановка системы налогового учета, разработка учетной политики для целей налогообложения;<br> 
                                Консультирование по вопросам налогообложения;<br> 
                                Представление интересов клиента в ходе проверок налоговыми и иными контролирующими органами.`,
    price: 1600,
    numReview: 7,
    rating: 4
  }, {
    _id: '555555555555555555555555',
    name: 'Сопутствующие услуги',
    category: 'Аудиторские услуги',
    description: 'Бухгалтерским службам организаций сегодня требуется обеспечить ведение и бухгалтерского, и налогового учета. Учитывая, что формирование абсолютно самостоятельной системы налогового учета, не связанной с бухгалтерским учетом, на наш взгляд, не является рациональным и приводит к многократному дублированию учетных операций, мы предлагаем использовать систему, при которой максимальный объем информации, необходимый для формирования налоговых регистров, может быть получен на основе данных бухгалтерского учета.',
    includingServices: `Налоговый аудит - выполнение работ по специальному аудиторскому заданию по выражению мнения о соответствии порядка формирования, 
                                отражения в учете и уплаты экономическим субъектом налогов и других платежей в бюджет и внебюджетные фонды по нормам, установленным 
                                законодательством; Постановка системы налогового учета, разработка учетной политики для целей налогообложения;<br> 
                                Консультирование по вопросам налогообложения;<br> 
                                Представление интересов клиента в ходе проверок налоговыми и иными контролирующими органами.`,
    price: 1750,
    numReview: 9,
    rating: 5
  }]
};
exports.default = _default;