/** @format */

export interface Data {
    data: GlobalData;
}

export interface GlobalData {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: TotalMarketCap;
    total_volume: TotalVolume;
    market_cap_percentage: MarketCapPercentage;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
}

export interface TotalMarketCap {
    btc: number;
    eth: number;
    ltc: number;
    bch: number;
    bnb: number;
    eos: number;
    xrp: number;
    xlm: number;
    link: number;
    dot: number;
    yfi: number;
    usd: number;
    aed: number;
    ars: number;
    aud: number;
    bdt: number;
    bhd: number;
    bmd: number;
    brl: number;
    cad: number;
    chf: number;
    clp: number;
    cny: number;
    czk: number;
    dkk: number;
    eur: number;
    gbp: number;
    gel: number;
    hkd: number;
    huf: number;
    idr: number;
    ils: number;
    inr: number;
    jpy: number;
    krw: number;
    kwd: number;
    lkr: number;
    mmk: number;
    mxn: number;
    myr: number;
    ngn: number;
    nok: number;
    nzd: number;
    php: number;
    pkr: number;
    pln: number;
    rub: number;
    sar: number;
    sek: number;
    sgd: number;
    thb: number;
    try: number;
    twd: number;
    uah: number;
    vef: number;
    vnd: number;
    zar: number;
    xdr: number;
    xag: number;
    xau: number;
    bits: number;
    sats: number;
}

export interface TotalVolume {
    btc: number;
    eth: number;
    ltc: number;
    bch: number;
    bnb: number;
    eos: number;
    xrp: number;
    xlm: number;
    link: number;
    dot: number;
    yfi: number;
    usd: number;
    aed: number;
    ars: number;
    aud: number;
    bdt: number;
    bhd: number;
    bmd: number;
    brl: number;
    cad: number;
    chf: number;
    clp: number;
    cny: number;
    czk: number;
    dkk: number;
    eur: number;
    gbp: number;
    gel: number;
    hkd: number;
    huf: number;
    idr: number;
    ils: number;
    inr: number;
    jpy: number;
    krw: number;
    kwd: number;
    lkr: number;
    mmk: number;
    mxn: number;
    myr: number;
    ngn: number;
    nok: number;
    nzd: number;
    php: number;
    pkr: number;
    pln: number;
    rub: number;
    sar: number;
    sek: number;
    sgd: number;
    thb: number;
    try: number;
    twd: number;
    uah: number;
    vef: number;
    vnd: number;
    zar: number;
    xdr: number;
    xag: number;
    xau: number;
    bits: number;
    sats: number;
}

export interface MarketCapPercentage {
    btc: number;
    eth: number;
    usdt: number;
    xrp: number;
    bnb: number;
    sol: number;
    usdc: number;
    doge: number;
    ada: number;
    steth: number;
}
