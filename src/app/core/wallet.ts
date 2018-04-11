import { request, makeUrl } from './request'
import { Observable } from 'rxjs/Observable'
import * as Big  from 'big.js';
import * as Random from 'random-js'

export { makeUrl }

export const Wallet = (url) => ({

  getbalance: (): Observable<Balance> =>
    request(url)('getbalance'),

  getaddress: (): Observable<Address> =>
    request(url)('getaddress'),

  getheight: (): Observable<Height> =>
    request(url)('getheight'),

  transfer: (x: TransferIn): Observable<TransferOut> =>
    request(url)('transfer', x),

  transfer_split: (x: TransferSplitIn): Observable<TransferSplitOut> =>
    request(url)('transfer_split', x),

  sweep_dust: () => request(url)('sweep_dust'),

  sweep_all: (x: SweepAllIn): Observable<SweepAllOut> => request(url)('sweep_all'),

  store: (): Observable<StoreOut> => request(url)('store'),

  get_payments: (x: GetPaymentsIn): Observable<GetPaymentsOut> =>
    request(url)('get_payments', x),

  get_bulk_payments: (x: GetBulkPaymentsIn): Observable<GetBulkPaymentsOut> =>
    request(url)('get_bulk_payments', x),

  get_transfers: (x: GetTransfersIn): Observable<GetTransfersOut> =>
    request(url)('get_transfers', x),

  get_transfer_by_txid: (x: { txid: string }): Observable<Transfer> =>
    request(url)('get_transfer_by_txid', x),

  incoming_transfers: (x: IncomingTransfersIn): Observable<IncomingTransfersOut> =>
    request(url)('incoming_transfers', x),

  query_key: (x: QueryKeyIn): Observable<QueryKeyOut> =>
    request(url)('query_key', x),

  make_integrated_address: (x: MakeIntegratedAddressIn): Observable<IntegratedAddress> =>
    request(url)('make_integrated_address', x),

  split_integrated_address: (x: IntegratedAddress): Observable<SplitIntegratedAddressOut> =>
    request(url)('split_integrated_address', x),

  stop_wallet: () => request(url)('stop_wallet'),

  make_uri: (x: MakeUriIn): Observable<Uri> =>
    request(url)('make_uri', x),

  parse_uri: (x: Uri): Observable<MakeUriIn> =>
    request(url)('parse_uri', x),

  get_address_book: (x: {entries: number[]}): Observable<GetAddressBookOut> =>
    request(url)('get_address_book', x),

  add_address_book: (x: AddAddressBook): Observable<{index: number}> =>
    request(url)('add_address_book', x),

  delete_address_book: (x: {index: number}) =>
    request(url)('delete_address_book', x),

  open_wallet: (x: OpenWallet) =>
    request(url)('open_wallet', x),

  create_wallet: (x: CreateWallet ) =>
    request(url)('create_wallet', x),

  other: (method: string, arg?: any): Observable<any> =>
    request(url)(method, arg),

});

export const generatePaymentId = (length: 16 | 64) =>
  Random.hex(false)(Random.engines.nativeMath, length);


export class Xmr extends Big {
  toAtomic = (): Atomic => new Atomic(this.times(1e12))
}


export class Atomic extends Big {
  toXmr = (): Xmr => new Xmr(this.div(1e12));
  toNumber = (): number => Number(this)
}


interface Balance {
  balance: number; // - unsigned int; The total balance of the current monero-wallet-rpc in session.
  unlocked_balance: number; // - unsigned int; Unlocked funds are those funds that are sufficiently deep enough in the Monero blockchain to be considered safe to spend.
}


interface Address {
  address: string;
}


interface Height {
  height: number;
}


interface Destination {
  amount: number; // - unsigned int; Amount to send to each destination, in atomic units.
  address: Address; // - string; Destination public address.
}


interface TransferIn {
  destinations: Destination[];
  fee?: number; // - unsigned int; Ignored, will be automatically calculated.
  mixin: number; // - unsigned int; Number of outpouts from the blockchain to mix with (0 means no mixing).
  unlock_time: number; // - unsigned int; Number of blocks before the monero can be spent (0 to not add a lock).
  payment_id?: string; // - string; (Optional) Random 32-byte/64-character hex string to identify a transaction.
  get_tx_key?: boolean; // - boolean; (Optional) Return the transaction key after sending. Outputs:
}


interface TransferOut {
  fee: number; // - Integer value of the fee charged for the txn.
  tx_hash: string; // - String for the publically searchable transaction hash
  tx_key: string; // - String for the transaction key if get_tx_key is true, otherwise, blank string.
}


interface TransferSplitIn {
  destinations: Destination[];
  fee?: number; // - unsigned int; Ignored, will be automatically calculated.
  mixin: number; // - unsigned int; Number of outpouts from the blockchain to mix with (0 means no mixing).
  unlock_time: number; // - unsigned int; Number of blocks before the monero can be spent (0 to not add a lock).
  payment_id?: string; // - string; (Optional) Random 32-byte/64-character hex string to identify a transaction.
  get_tx_key?: boolean; // - boolean; (Optional) Return the transaction key after sending. – Ignored
  new_algorithm?: boolean; // - boolean; True to use the new transaction construction algorithm, defaults to false.
}


interface TransferSplitOut {
  fee_list: number[];
  tx_hash_list: string[];
}


interface SweepDustOut {
  tx_hash_list: string[];
}


interface StoreOut { }


interface GetPaymentsIn {
  payment_id: string;
}


interface Payment {
  amount: number;
  block_height: number;
  payment_id: string;
  tx_hash: string;
  unlock_time: number;
};


interface GetPaymentsOut {
  payments: Payment[]
}


interface GetBulkPaymentsIn {
  payment_ids: string[]; // - array of: string
  min_block_height: number; // - unsigned int; The block height at which to start looking for payments.
}


interface GetBulkPaymentsOut {
  payments: Payment[];
}


interface GetTransfersIn {
  in?: boolean; // - boolean;
  out?: boolean; // - boolean;
  pending?: boolean; // - boolean;
  failed?: boolean; // - boolean;
  pool?: boolean; // - boolean;
  filter_by_height?: boolean; // - boolean;
  min_height?: number; // - unsigned int;
  max_height?: number; // - unsigned int;
}


interface GetTransfersOut {
  in?: Transfer[] & Destination[]; // - boolean;
  out?: Transfer[]; // - boolean;
  pending?: Transfer[]; // - boolean;
  failed?: Transfer[]; // - boolean;
  pool?: Transfer[]; // - boolean;
}


interface Transfer {
  amount: number;
  fee: number;
  height: number;
  note: string;
  payment_id: string;
  timestamp: number;
  txid: string;
  type: string;
};


interface IncomingTransfersIn {
  transfer_type: "all" | "available" | "unavailable"
}


interface IncomingTransfersOut {
  amount: number; // - unsigned int
  spent: boolean; // - boolean
  global_index: number; // - unsigned int; Mostly internal use, can be ignored by most users.
  tx_hash: string; // - string; Several incoming transfers may share the same hash if they were in the same transaction.
  tx_size: number; // - unsigned int
}


interface QueryKeyIn {
  key_type: string;
}


interface QueryKeyOut {
  key: string;
}


interface MakeIntegratedAddressIn {
  payment_id: string;
}


interface IntegratedAddress {
  integrated_address: Address;
  payment_id: string;
}


interface SplitIntegratedAddressOut {
  standard_address: Address;
  payment_id: string;
}


interface MakeUriIn {
  address: Address;
  amount?: number; // (optional) - the integer amount to receive, in atomic units
  payment_id?: string; // (optional) - 16 or 64 character hexadecimal payment id string
  recipient_name?: string; // (optional) - string name of the payment recipient
  tx_description: string; // (optional) - string describing the reason for the tx
}


interface Uri {
  uri: string;
}


interface ParseUri {
  uri: MakeUriIn;
}

interface SweepAllIn {
  address: string; // Destination public address.
  priority?: number; // (Optional)
  mixin: number; //  Number of outpouts from the blockchain to mix with (0 means no mixing).
  unlock_time: number; // unsigned int; Number of blocks before the monero can be spent (0 to not add a lock).
  payment_id?: string; // (Optional) Random 32-byte/64-character hex string to identify a transaction.
  get_tx_keys?: boolean; // (Optional) Return the transaction keys after sending.
  below_amount?: number; // (Optional)
  do_not_relay?: boolean; // (Optional)
  get_tx_hex: boolean; // (Optional) return the transactions as hex encoded string.
}

interface SweepAllOut {
  tx_hash_list: string[];
  tx_key_list: string[];
  tx_blob_list: string[];
}

 interface GetAddressBookOut {
    entries: {
      address: string,
      description: string,
      index: number,
      payment_id: string
    }
 }

interface AddAddressBook {
    address: string;
    payment_id?: string // (optional) string, defaults to "0000000000000000000000000000000000000000000000000000000000000000";
    description?:  string // (optional) string, defaults to "";
}

interface OpenWallet {
    filename: string;
    password: string;
}

interface CreateWallet {
    filename: string;
    password: string;
    language: string; // Language for your wallets' seed.
}
