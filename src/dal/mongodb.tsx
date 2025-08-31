"use server";
import "server-only";


export async function findData(obj: { db_name: string, co_name: string, filter: object, options: object }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { db_name, co_name, filter, options } = obj;
  const url = `https://10.124.16.7:443/api/find?db_name=${encodeURIComponent(db_name)}&co_name=${encodeURIComponent(co_name)}&filter=${encodeURIComponent(JSON.stringify(filter))}&options=${encodeURIComponent(JSON.stringify(options))}`;
  const res = await fetch(url);
  const data = (await res.json()).data;
  return data;
}

export async function insertOneData(obj: { db_name: string, co_name: string, doc: object, options: object }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { db_name, co_name, doc, options } = obj;
  const url = `https://10.124.16.7:443/api/insert-one?db_name=${encodeURIComponent(db_name)}&co_name=${encodeURIComponent(co_name)}&doc=${encodeURIComponent(JSON.stringify(doc))}&options=${encodeURIComponent(JSON.stringify(options))}`;
  const res = await fetch(url);
  const data = (await res.json()).data;
  return data;
}

export async function deleteManyData(obj: { db_name: string, co_name: string, filter: object, options: object }) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const { db_name, co_name, filter, options } = obj;
  const url = `https://10.124.16.7:443/api/delete-many?db_name=${encodeURIComponent(db_name)}&co_name=${encodeURIComponent(co_name)}&filter=${encodeURIComponent(JSON.stringify(filter))}&options=${encodeURIComponent(JSON.stringify(options))}`;
  const res = await fetch(url);
  const data = (await res.json()).data;
  return data;
}
