import axios from 'axios';

import { API, Strings } from '@/constants';
import * as Sentry from '@/sentry';

class ApiService {
  axios: axios.Axios;

  constructor() {
    this.setupAxios();
  }

  setToken = (token: ?string) => {
    if (token) {
      this.axios.defaults.headers.common.Authorization = `bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common.Authorization;
    }
  };

  setupAxios = () => {
    if (this.axios) {
      return;
    }

    const config = {
      // baseURL: 'https://api.mysessiontracker.com/',
      baseURL: 'https://staging-api.mysessiontracker.com/',
      // baseURL: 'http://192.168.1.169:3000/', // .1.169:3000/
      // baseURL: 'http://localhost:3000/',
      headers: {
        Accept: 'application/json',
        // 'Content': 'application/json',
      },
      timeout: 8000,
    };

    this.axios = axios.create(config);

    this.axios.interceptors.request.use(
      request => {
        console.log('Starting Request', request);
        return request;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      response => {
        console.log('Response:', response);
        return response;
      },
      error => {
        const { response } = error;
        const config = error.config || (response && response.config) || {};

        if (error) console.log('Response error:', error);
        else console.log('Response:', (response && response.data) || response);

        if (error.toString().indexOf('timeout of') > -1) {
          return Promise.reject(new Error(Strings.networkError));
        }

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        Sentry.withScope(scope => {
          // Send additional data
          const request = {
            ...config,
            password: undefined,
          };
          scope.setExtra('Request', JSON.stringify(request));
          // Send error
          Sentry.captureException(error);
        });

        return Promise.reject(error);
      }
    );
  };

  getServerTime = () => this.axios.get(API.now);

  attemptLogin = (email: string, password: string) =>
    this.axios.post(API.login, {
      email,
      password,
    });
  attemptSignup = (payload: User) => this.axios.post(API.signup, payload);
  sendOtp = (email: string) =>
    this.axios.post(API.sendOtp, {
      email,
    });
  loginOtp = (email: string, otPassword: string) =>
    this.axios.post(API.loginOtp, { email, otPassword });
  forgotPassword = (email: string) =>
    this.axios.post(API.forgotPassword, {
      email,
    });
  resetPassword = data => this.axios.post(API.resetPassword, data);
  deleteAccount = (data: any) => this.axios.post(API.closeAccount, data);

  fetchMe = () => this.axios.get(API.me);

  updateMe = changes => this.axios.patch(API.me, changes);

  updateMyAvatar = (formData: any) =>
    this.axios.post(API.myAvatar, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

  updateClientAvatar = (clientId, formData: any) =>
    this.axios.post(API.clientAvatar(String(clientId)), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

  changeMyPassword = data => this.axios.post(API.changePassword, data);

  fetchClients = () => this.axios.get(API.clients);
  fetchArchivedClients = () => this.axios.get(API.archivedClients);
  createClient = client => this.axios.post(API.clients, client);
  importClients = clients => this.axios.post(API.importClients, clients);
  fetchClient = (clientId: string) =>
    this.axios.get(API.client(String(clientId)));
  updateClient = (clientId, updates) =>
    this.axios.patch(API.client(String(clientId)), updates);
  deleteClient = (clientId: string) =>
    this.axios.delete(API.client(String(clientId)));
  exportClientsCSV = () => this.axios.get(API.clientsExportCSV);

  fetchClientEventIds = (clientId, startDate, endDate) =>
    this.axios.get(API.clientEventIds(String(clientId)), {
      params: { startDate, endDate },
    });
  postArchiveClient = clientId =>
    this.axios.post(API.archiveClient(clientId), {});
  postRestoreClient = clientId =>
    this.axios.post(API.restoreClient(clientId), {});

  getClientMetas = clientId => this.axios.get(API.clientMetas(clientId), {});
  createClientMeta = (clientId, data) =>
    this.axios.post(API.clientMetas(clientId), data);
  getClientMeta = (clientId, metaId) =>
    this.axios.get(API.clientMeta(clientId, metaId), {});
  updateClientMeta = (clientId, metaId, data) =>
    this.axios.patch(API.clientMeta(clientId, metaId), data);
  deleteClientMeta = (clientId, metaId) =>
    this.axios.delete(API.clientMeta(clientId, metaId), {});

  fetchClientNotes = clientId => this.axios.get(API.clientNotes(clientId));

  getClientSettings = clientId => this.axios.get(API.clientSettings(clientId));
  postClientsSetting = (clientId, data) =>
    this.axios.post(API.clientSettings(clientId), data);

  fetchSessions = (clientId: string) =>
    this.axios.get(API.sessions(String(clientId)));
  createSession = (clientId: string, availableSessions: number) =>
    this.axios.post(API.sessions(String(clientId)), {
      availableSessions,
    });
  setTempSessions = (clientId: string, tempSessionsLeft: number) =>
    this.axios.post(API.tempSessions(String(clientId)), {
      tempSessionsLeft,
    });
  updateSession = (clientId: string, sessionId: string, data) =>
    this.axios.patch(API.session(String(clientId), String(sessionId)), data);
  deleteSession = (clientId: string, sessionId: string) =>
    this.axios.delete(API.session(String(clientId), String(sessionId)));

  fetchSessionTypes = () => this.axios.get(API.sessionTypes);
  createSessionType = (
    name: string,
    description: string,
    color: string,
    price: number
  ) =>
    this.axios.post(API.sessionTypes, {
      name,
      description,
      color,
      price,
    });
  updateSessionType = (
    sessionTypeId: string,
    name: string,
    description: string,
    color: string,
    price: number
  ) =>
    this.axios.patch(API.sessionType(sessionTypeId), {
      name,
      description,
      color,
      price,
    });
  deleteSessionType = (sessionTypeId: string) =>
    this.axios.delete(API.sessionType(sessionTypeId));

  appleLogin = data => this.axios.post(API.appleLogin, data);
  facebookLogin = data => this.axios.post(API.facebookLogin, data);
  googleLogin = data => this.axios.post(API.googleLogin, data);

  fetchCalendar = (startDate, endDate) =>
    this.axios.get(API.calendar, { params: { startDate, endDate } });
  fetchCalendarV2 = (startDate, endDate) =>
    this.axios.get(API.calendarV2, { params: { startDate, endDate } });
  fetchCalendarEvent = eventId => this.axios.get(API.calendarEvent(eventId));
  createCalendarEvent = event => this.axios.post(API.calendar, event);
  updateCalendarEvent = (eventId, event) =>
    this.axios.patch(API.calendarEvent(eventId), event);
  deleteCalendarEvent = eventId =>
    this.axios.delete(API.calendarEvent(eventId));

  fetchProcessedEvents = () => this.axios.get(API.processedEvents);
  clearProcessedEvents = () => this.axios.post(API.clearProcessedEvents);
  clearProcessedEvent = eventId =>
    this.axios.post(API.clearProcessedEvent(eventId));

  getOpenWeather = (lat, lon) => this.axios.get(API.openWeather(lat, lon));

  createEventEdit = (eventId, edit) =>
    this.axios.post(API.calendarEdits(eventId), edit);
  updateEventEdit = (eventId, editId, changes) =>
    this.axios.patch(API.calendarEdit(eventId, editId), changes);
  deleteEventEdit = (eventId, editId) =>
    this.axios.delete(API.calendarEdit(eventId, editId));

  postSupportMessage = data => this.axios.post(API.supportEmail, data);

  getDashboard = () => this.axios?.get(API.dashboard);

  getUserMeta = () => this.axios.get(API.userMeta);
  getUserMetaKey = metaKey => this.axios.get(API.userMetaKey(metaKey));
  setUserMetaKey = (metaKey, metaValue) =>
    this.axios.post(API.userMetaKey(metaKey), { metaValue });

  getPrices = (): Promise<AxiosResponse> | undefined =>
    this.axios?.get(API.paymentPrices);
  postCheckoutSession = (
    data: PostCheckoutSession
  ): Promise<AxiosResponse> | undefined =>
    this.axios?.post(API.paymentCheckoutSession, data);
  getPortalSession = (): Promise<AxiosResponse> | undefined =>
    this.axios?.get(API.paymentPortalSession);

  logout = (): Promise<AxiosResponse> | undefined =>
    this.axios?.get(API.logout);
}

export default new ApiService();
