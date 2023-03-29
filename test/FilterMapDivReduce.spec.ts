import { expect } from "chai";
import "mocha";

import {FilterMapDivReduce} from "../src/modificacionp9/FilterMapDivReduce";

let filterAdd = new FilterMapDivReduce([-1, 4, 6, 7, 8, 10]);
filterAdd.run();

describe("FilterMapDivReduce", () =>{
    it("Si se ejecuta el run sobre la ista [-1, 4, 6, 7, 8, 10] en la lista resultante tiene que haber solo los numeros positivos y multiplicads por 2",() =>{
        expect(filterAdd.lista).to.be.eqls([ 8, 12, 14, 16, 20 ]);
    });
    it("Si se ejecuta el run sobre la ista [-1, 4, 6, 7, 8, 10] en la resultado final despues de hacer el reduce de la suma tiene que ser -70",() =>{
        expect(filterAdd.resultadoFinal).to.be.eqls(0.0000023251488095238093);
    });
});