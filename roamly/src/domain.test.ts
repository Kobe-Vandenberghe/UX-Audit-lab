import { test } from 'node:test';
import assert from 'node:assert/strict';
import { defaultTrip, nights, quote, tripError } from './domain.ts';
test('dates and capacity are validated before reserving',()=>{
  assert.equal(nights(defaultTrip),3);
  assert.equal(tripError(defaultTrip),'');
  assert.match(tripError({...defaultTrip,end:defaultTrip.start}),/after/);
  assert.match(tripError({...defaultTrip,start:'not a date'}),/after/);
  assert.match(tripError({...defaultTrip,end:'2027-02-01'}),/30 nights/);
  assert.match(tripError({...defaultTrip,guests:3},2),/1–2/);
  assert.match(tripError({...defaultTrip,guests:1.5}),/guests/);
});
test('the final price includes room, selected extras, fees and city tax',()=>{
  const cost=quote(126,defaultTrip,{breakfast:true,transfer:true,protection:true});
  assert.deepEqual(cost,{count:3,room:378,breakfast:108,transfer:48,protection:29,fee:32.13,tax:21,total:616.13});
  assert.equal(quote(126,{...defaultTrip,room:'terrace'},{breakfast:false,transfer:false,protection:false}).total,535.29);
});
