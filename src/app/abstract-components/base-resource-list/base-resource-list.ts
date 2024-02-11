import { Injectable, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BaseResourceModel } from 'src/app/utils/interfaces/base-resource.model';
import { BaseResourceService } from '../base-resource.service';

@Injectable()
export abstract class BaseResourceList<T extends BaseResourceModel>
  implements OnInit {
  public resources: T[] = [];
  public isLoading = false;

  constructor(
    protected service: BaseResourceService<T>,
    protected injector: Injector
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.service
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => (this.resources = data),
        error:(e) => alert('Erro ao carregar a listagem'),
      });
  }

  public deleteById(id: number): void {
    if (confirm("Deseja realmente excluir esse item?") == true) {
      this.service
        .delete(id)
        .subscribe(
          () => (this.resources = this.resources.filter((el) => el.id !== id))
        );
    } else {
      return;
    }
  }
}
