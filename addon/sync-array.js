import Ember from 'ember';

export default function syncArray(array, inputArray) {
  array.length = inputArray.length;

  Ember.beginPropertyChanges();

  for (let i = 0; i < inputArray.length; i++) {
    let entry = array[i];
    if (entry === undefined) {
      array[i] = Ember.ObjectProxy.create({
        content: inputArray[i]
      });
    } else if (entry instanceof Ember.ObjectProxy) {
      array[i].set('content', inputArray[i]);
    } else {
      throw new TypeError('array contained non ObjectProxy content');
    }
  }

  Ember.endPropertyChanges();
  return array;
}

