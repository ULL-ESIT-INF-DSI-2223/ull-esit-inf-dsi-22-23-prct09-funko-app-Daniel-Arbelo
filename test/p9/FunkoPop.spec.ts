import { expect } from 'chai';
import 'mocha';
import { FunkoPop } from '../../src/p9/FunkoPop.js';
import {FunkoType} from '../../src/p9/FunkoPop.js';
import {FunkoGenre} from '../../src/p9/FunkoPop.js';


let funkoBatman = new FunkoPop("id-20", "Batman", "Super heroe sin poderes", FunkoType.POP, FunkoGenre.MOVIES_AND_TV, "Bob Kane y Bill Finge", 12, false, "Se mueve la cabeza", 33);

describe('Funko Pop ', () => {
    describe('getters de la clase Funkopop', () => {
        it('getter del id', () => {
          expect(funkoBatman.id).to.equal("id-20");
        });
        it('getter del nombre', () => {
            expect(funkoBatman.name).to.equal("Batman");
        });
        it('getter de la descripcion', () => {
            expect(funkoBatman.description).to.equal("Super heroe sin poderes");
        });
        it('getter del tipo', () => {
            expect(funkoBatman.type).to.equal("Pop!");
        });
        it('getter del genero', () => {
            expect(funkoBatman.genre).to.equal("Movies and TV");
        });
        it('getter de la franquicia', () => {
            expect(funkoBatman.franchise).to.equal("Bob Kane y Bill Finge");
        });
        it('getter del numero', () => {
            expect(funkoBatman.number).to.equal(12);
        });
        it('getter de la exclusividad', () => {
            expect(funkoBatman.exclusive).to.equal(false);
        });
        it('getter de las caracteristicas especiales', () => {
            expect(funkoBatman.specialFeatures).to.equal("Se mueve la cabeza");
        });
        it('getter del valor en mercado', () => {
            expect(funkoBatman.marketValue).to.equal(33);
        });
    });

    describe('setters de la clase Funkopop', () => {
        it('setter del id', () => {
            funkoBatman.cambiarid("id-21");
            expect(funkoBatman.id).to.equal("id-21");
        });
        it('setter del nombre', () => {
            funkoBatman.cambiarname("BatmanOscuro")
            expect(funkoBatman.name).to.equal("BatmanOscuro");
        });
        it('setter de la descripcion', () => {
            funkoBatman.cambiardescription("El mejor super heroe")
            expect(funkoBatman.description).to.equal("El mejor super heroe");
        });
        it('setter del tipo', () => {
            funkoBatman.cambiartype(FunkoType.VINYL_GOLD)
            expect(funkoBatman.type).to.equal("Vinyl Gold");
        });
        it('setter del genero', () => {
            funkoBatman.cambiargenre(FunkoGenre.ANIME)
            expect(funkoBatman.genre).to.equal("Anime");
        });
        it('setter de la franquicia', () => {
            funkoBatman.cambiarfranchise("Bob Kane")
            expect(funkoBatman.franchise).to.equal("Bob Kane");
        });
        it('setter del numero', () => {
            funkoBatman.cambiarnumber(1)
            expect(funkoBatman.number).to.equal(1);
        });
        it('setter de la exclusividad', () => {
            funkoBatman.cambiarexclusive(true)
            expect(funkoBatman.exclusive).to.equal(true);
        });
        it('setter de las caracteristicas especiales', () => {
            funkoBatman.cambiarspecialFeatures("Brilla")
            expect(funkoBatman.specialFeatures).to.equal("Brilla");
        });
        it('setter del valor en mercado', () => {
            funkoBatman.cambiarmarketValue(180);
            expect(funkoBatman.marketValue).to.equal(180);
        });
    });
    
});