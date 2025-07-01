
const API_BASE_URL = 'http://localhost:5000'; // Change this to your Flask server URL

export interface LoginCredentials {
  store_id: string;
  password: string;
}

export interface RegisterCredentials {
  store_id: string;
  password: string;
}

export interface InventoryItem {
  item_id: string;
  product: string;
  stock: number;
  store_id?: string;
}

export interface SalesData {
  date: string;
  item_id: string;
  product: string;
  quantity: number;
  store_id?: string;
}

export interface Prediction {
  item_id: string;
  start_date: string;
  end_date: string;
  predicted_quantity: number;
  current_stock: number;
  difference: number;
  status: string;
}

class ApiService {
  private async makeRequest(url: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      credentials: 'include', // Include cookies for session management
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }

    return response;
  }

  async login(credentials: LoginCredentials) {
    const formData = new FormData();
    formData.append('store_id', credentials.store_id);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Invalid store ID or password');
    }

    return response;
  }

  async register(credentials: RegisterCredentials) {
    const formData = new FormData();
    formData.append('store_id', credentials.store_id);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }

    return response;
  }

  async logout() {
    return this.makeRequest('/logout');
  }

  async getDashboardData() {
    const response = await this.makeRequest('/dashboard');
    return response.text(); // Flask returns HTML, you might want to create separate API endpoints
  }

  async uploadInventory(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/inventory/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload inventory');
    }

    return response;
  }

  async uploadSales(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/sales/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload sales data');
    }

    return response;
  }

  async generatePredictions() {
    const response = await this.makeRequest('/predict', {
      method: 'POST',
    });

    return response.text(); // Returns HTML, might want to create JSON API
  }

  async getPredictions() {
    const response = await this.makeRequest('/predict-page');
    return response.text();
  }

  async getTransferSuggestions() {
    const response = await this.makeRequest('/transfer-suggestions', {
      method: 'POST',
    });

    return response.text();
  }

  async addInventoryItem(item: InventoryItem) {
    const formData = new FormData();
    formData.append('item_id', item.item_id);
    formData.append('product', item.product);
    formData.append('stock', item.stock.toString());

    const response = await fetch(`${API_BASE_URL}/inventory/add`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to add inventory item');
    }

    return response;
  }

  async updateInventoryItem(itemId: string, item: Partial<InventoryItem>) {
    const formData = new FormData();
    if (item.product) formData.append('product', item.product);
    if (item.stock !== undefined) formData.append('stock', item.stock.toString());

    const response = await fetch(`${API_BASE_URL}/inventory/update/${itemId}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }

    return response;
  }

  async deleteInventoryItem(itemId: string) {
    const response = await fetch(`${API_BASE_URL}/inventory/delete/${itemId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete inventory item');
    }

    return response;
  }
}

export const apiService = new ApiService();
