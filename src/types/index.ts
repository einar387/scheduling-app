import { Moment } from 'moment-timezone';

export type SortDirection = 'ASC' | 'DESC';
export type PgFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type Frequency =
  | 'NEVER'
  | 'DAILY'
  | 'WEEKDAYS'
  | 'WEEKLY'
  | 'BIWEEKLY'
  | 'MONTHLY'
  | 'YEARLY';
export type ContextColor =
  | 'DEFAULT'
  | 'SUCCESS'
  | 'DANGER'
  | 'INFO'
  | 'WARNING';
export type AlertFrequency =
  | 'NEVER'
  | 'DAILY'
  | 'WEEKLY'
  | 'WEEKDAYS'
  | 'BIWEEKLY'
  | 'MONTHLY'
  | 'YEARLY';
export type Occurrence = 'SINGLE' | 'RECURRING';
export type CalendarRange = 'DAY' | 'WEEK' | 'MONTH';
export type Attendance =
  | 'PRESENT'
  | 'ABSENT'
  | 'LATE'
  | 'CANCELLED'
  | 'LATE CANCELLED';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | string;

/* eslint-disable no-unused-vars */
export type User = {
  id: number;
  name?: string;
  avatar?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string;
  expo_push_token?: string;
  available_app_version?: string;
  has_accepted_terms?: string;
  is_activated?: boolean;
  app_version?: string;
  tz?: string;
};

export type Client = {
  id: number;
  user_id: string;
  name_alias: string;
  email_alias: string;
  sessions_left: number;
  created_at?: string;
  updated_at?: string;
};

export type ClientNote = {
  session_id: number;
  notes: string;
  used_at: string;
};

export type ClientSetting = {
  optionKey: string;
  optionValue: string;
};

export type Session = {
  id: number;
  client_id: string;
  attendance: boolean;
  notes?: string;
  session_type_id?: string;
  created_at?: string;
  updated_at?: string;
};

export type SessionType = {
  id: number;
  user_id: string;
  name: string;
  description: string;
  color: string;
  created_at?: string;
  updated_at?: string;
};

export type SmallEvent = {
  id: string;
  starts_at: string;
};

export type CalendarEvent = {
  id: string; // not number
  user_id: number;
  client_id?: number;
  session_type_id?: number;
  title: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  is_active: boolean;
  starts_at: string;
  duration?: number;
  occurrence: Occurrence;

  frequency?: Frequency;
  recurring_ends_at?: string;
  recurring_starts_at?: string;
  month_of_year?: number;
  day_of_month?: number;
  day_of_week?: number;
  hour_of_day?: number;
  minute_of_hour?: number;
  interval: number;

  send_notifications: boolean;
  notification_distance?: number;
  system_event_id?: string;
  edit_id?: number;
};

export type CalendarEventEdit = {
  id: number;
  user_id: number;
  event_id: number;
  event_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type CalendarDay = {
  hour?: Moment;
  day?: Moment;
  month?: Moment;
  events: Array<CalendarEvent>;
};

/* eslint-disable no-unused-vars */

export type RootState = Record<string, any>;
// {
//   me: MeState;
//   auth: AuthState;
//   clients: ClientsState;
//   clientMeta: ClientMetaState;
//   clientNotes: ClientNotesState;
//   clientOptions: ClientOptionsState;
//   sessions: SessionsState;
//   sessionTypes: SessionTypesState;
//   calendar: CalendarState;
//   calendarEdits: CalendarEditsState;
//   layout: LayoutState;
//   dashboard: DashboardState;
//   payment: PaymentState;
//   schedules: SchedulesState;
//   network: NetworkState;
// }

export interface ServerResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface FetchState {
  pending: boolean;
  success: boolean;
  message?: string;
  time?: number;
}

/**
 * Generalized FSA action.
 * * T: Action type string
 * * P: Interface for the Payload field
 * * M: Interface for the Meta field
 * * E: Interface for the Error field
 */
export type Action<T, P = void, M = void, E = void> = {
  type: T;
  notification?: {
    error?: string;
    success?: string;
  };
} & Payload<P> &
  Meta<M> &
  Error<E>;
export type Payload<P> = P extends void ? { payload?: any } : { payload: P };
export type Meta<M> = M extends void ? { meta?: any } : { meta: M };
export type Error<E> = E extends void ? { error?: any } : { error: E };
/**
 * Can be used to represent any possible redux action.
 */
export type AnyAction = Action<any, any, any, any>;
// Any selector
export type AnySelector = (state: RootState, args?: any) => any;

// Pick optional properties of a type
export type OptionalProps<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;
/**
 * Makes every optional prop required, and every required prop optional.
 * This is useful for making sure we define a default value for every prop
 * that may not be passed in.
 */
export type DefaultProps<T extends object> = Required<
  Pick<
    T,
    Exclude<
      {
        [K in keyof T]: T extends Record<K, T[K]> ? never : K;
      }[keyof T],
      undefined
    >
  >
>;

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type SelectOption = {
  label: string;
  value: string | number;
  data?: any;
};

export type Tab = { id: string; name: string; index: number };
