/* eslint-disable camelcase */

export interface Product {
    id: number;
    tipo: string;
    codigo: string;
    situacao: string;
    descricao: string;
    unidade: string;
    preco: string;
    preco_custo: string;
    pesoLiq: string;
    pesoBruto: string;
    gtin: string;
    gtinEmbalagem: string;
    descricaoComplementar: string;
    larguraProduto: string;
    alturaProduto: string;
    profundidadeProduto: string;
    estoqueMinimo: string;
    estoqueMaximo: string;
    class_fiscal: string;
    cest: string;
    idGrupoProduto: string | null;
    condicao: string | null;
    freteGratis: string;
    linkExterno: string;
    observacoes: string;
    producao: string;
    unidadeMedida: string | null;
    itensPorCaixa: number | null;
    volumes: number | null;
    urlVideo: string;
    localizacao: string;
    crossdocking: number | null;
    marca: string;
    garantia: number | string;
    dataValidade: string;
    spedTipoItem: string;
    descricaoFornecedor: string;
    codigoFabricante: string;
    idCategoria: string | null;
}

export interface ProductBling {
    produto: Product
}

interface Erros {
    cod: number;
    msg: string;
}

export interface Error {
    erros: Erros
}

export interface IProductBlingProvider {
    getProductBling(): Promise<Array<ProductBling> | Error>;
}
