import type { AnimationCategory, IAnimation } from "./constants";
import animations from "./list";

export class AnimationsService {

  static getAnimsFromCategory<T extends AnimationCategory>(category: T): IAnimation[] {
    return animations[category];
  }

  static getByAnimId(animId: number): IAnimation | undefined {
    for (const animArray of Object.values(animations)) {
      const found = animArray.find(anim => anim.animId === animId);
      if (found) return found;
    }
  }

  static getById<T extends AnimationCategory>(category: T, id: number): IAnimation | undefined {
    return animations[category][id];
  }

  static getByLibrary(library: string): IAnimation[] {
    const result: IAnimation[] = [];

    for (const animArray of Object.values(animations)) {
      for (const anim of animArray) {
        if (anim.library === library) result.push(anim);
      }
    }

    return result;
  }

  static getByName(name: string): IAnimation | undefined {
    for (const animArray of Object.values(animations)) {
      const found = animArray.find(anim => anim.name === name);
      if (found) return found;
    }
  }

  static getSize() {
    let size = 0;

    for (const animArray of Object.values(animations)) {
      size += animArray.length;
    }

    return size;
  }
}