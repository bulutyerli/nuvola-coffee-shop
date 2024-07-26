import { Address } from '../database-types';

export async function getAddresses() {
  const res = await fetch('/api/addresses');
  if (!res.ok) {
    throw new Error('User info could not fetched');
  }

  const { addresses }: { addresses: Address[] } = await res.json();

  return addresses;
}

export async function addNewAddress(data: Address) {
  const res = await fetch('/api/addresses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || 'Addresses could not be fetched';
    throw new Error(errorMessage);
  }

  const result = await res.json();
  return result.address[0];
}

export async function updateAddress(data: Address) {
  const res = await fetch('/api/addresses', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error || 'Addresses could not be fetched';
    throw new Error(errorMessage);
  }

  const result = await res.json();
  return result.newAddress;
}

export async function deleteAddress(id: number) {
  await fetch(`/api/addresses?address_id=${id}`, {
    method: 'DELETE',
  });
}
