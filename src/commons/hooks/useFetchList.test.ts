import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import useFetchList from "./useFetchList";

describe("useFetchList", () => {
  let mockAxios: MockAdapter;
  const mockApi = "https://myapi.com";

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useFetchList(mockApi));

    const expected = {
      data: [],
      error: null,
      initialized: false,
      loading: true,
      total: 0,
      totalPage: 0,
      currentPage: 0,
      isDataOverSize: null,
      refresh: expect.any(Function),
      update: expect.any(Function),
      lastUpdated: undefined,
      query: {}
    };

    expect(result.current).toEqual(expected);
  });

  it("should fetch data successfully", async () => {
    const data = [
      { id: 1, name: "Adam" },
      { id: 2, name: "Eva" }
    ];
    const response = {
      data,
      currentPage: 1,
      totalPages: 1,
      totalItems: 2
    };
    mockAxios.onGet(`${mockApi}?page=1`).reply(200, response);

    const { result } = renderHook(() => useFetchList(mockApi, { page: 1 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.currentPage).toBe(1);
      expect(result.current.totalPage).toBe(1);
      expect(result.current.total).toBe(2);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });
  });

  it("should handle errors", async () => {
    const error = { message: "Something went wrong" };
    mockAxios.onGet(`${mockApi}?page=1`).reply(400, error);

    const { result } = renderHook(() => useFetchList(mockApi, { page: 1 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toEqual(error.message);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });
  });

  it("should handle refresh", async () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ];

    const response = {
      data: data,
      currentPage: 1,
      totalPages: 1,
      totalItems: 2
    };

    mockAxios.onGet(`${mockApi}?page=1`).reply(200, response);

    const { result } = renderHook(() => useFetchList(mockApi, { page: 1 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.currentPage).toBe(1);
      expect(result.current.totalPage).toBe(1);
      expect(result.current.total).toBe(2);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });

    const lastUpdated = result.current.lastUpdated;

    result.current.refresh();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.totalPage).toBe(1);
      expect(result.current.total).toBe(2);
      expect(result.current.lastUpdated).not.toBe(lastUpdated);
    });
  });

  it("should handle update key", async () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ];

    const response = {
      data: data,
      currentPage: 1,
      totalPages: 1,
      totalItems: 2
    };

    let key = 1;

    mockAxios.onGet(`${mockApi}?page=1`).reply(200, response);

    const { result, rerender } = renderHook(() => useFetchList(mockApi, { page: 1 }, false, key));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });

    const lastUpdated = result.current.lastUpdated;

    key = 2;

    rerender();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.lastUpdated).not.toBe(lastUpdated);
    });
  });
});
