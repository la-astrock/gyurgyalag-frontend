const allergenMatrix = {
    gluten: '/allergenek/gluten.svg',
    csillagfurt: '/allergenek/csillagfurt.svg',
    diofelek: '/allergenek/diofelek.svg',
    foldimogyoro: '/allergenek/foldimogyoro.svg',
    gomba: '/allergenek/gomba.svg',
    hal: '/allergenek/hal.svg',
    kendioxid: '/allergenek/kendioxid.svg',
    kukorica: '/allergenek/kukorica.svg',
    mustar: '/allergenek/mustar.svg',
    puhatestuek: '/allergenek/puhatestuek.svg',
    rakfelek: '/allergenek/rakfelek.svg',
    szezammag: '/allergenek/szezammag.svg',
    szojabab: '/allergenek/szojabab.svg',
    tej: '/allergenek/tej.svg',
    tojas: '/allergenek/tojas.svg'
}

export const allergenSelector = (allergen: string): string => {
    return allergenMatrix[allergen]
}