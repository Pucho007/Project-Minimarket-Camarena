import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterproducto'
})
export class FilterproductoPipe implements PipeTransform {

  transform(value: any, texto: string): any[] {
    const resultadoProductos=[];
    for(const pro of value){
      if(pro.nombre.toLowerCase().indexOf(texto.toLowerCase())>-1){
        resultadoProductos.push(pro);
      }
    }
    return resultadoProductos;
  }

}
