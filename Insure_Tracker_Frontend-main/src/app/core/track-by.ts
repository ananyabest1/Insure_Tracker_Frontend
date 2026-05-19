/** Shared trackBy helpers for *ngFor (Angular 16). */
export function trackByIndex(index: number): number {
  return index;
}

export function trackByIdentity<T>(_index: number, item: T): T {
  return item;
}

export function trackById(_index: number, item: { id: string }): string {
  return item.id;
}

export function trackByClaimId(_index: number, item: { claimId: string }): string {
  return item.claimId;
}

export function trackByTitle(_index: number, item: { title: string }): string {
  return item.title;
}

export function trackByName(_index: number, item: { name: string }): string {
  return item.name;
}

export function trackByRef(_index: number, item: { ref: string }): string {
  return item.ref;
}
