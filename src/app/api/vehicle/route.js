import AuthService from "@/services/AuthService";
import VehicleService from "@/services/VehicleService";
import ResponseHandler from "@/lib/helpers/ResponseHandler";
import { VehicleSchema } from "@/lib/validations/vehicle-schema";

export async function GET(request) {
  try {
    const user = await AuthService.verifyUser(request);
    if (!user) return ResponseHandler.error('Unauthorized access', 401);

    const vehicles = await VehicleService.getByOwner(user.ref);
    return ResponseHandler.success(vehicles);

  } catch (error) {
    console.error('GET Error:', error);
    return ResponseHandler.error('Internal server error');
  }
}

export async function POST(request) {
  try {
    const user = await AuthService.verifyUser(request);
    if (!user) return ResponseHandler.error('Unauthorized access', 401);

    const rawData = await request.json();
    const result = VehicleSchema.create.safeParse(rawData);

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message);
      return ResponseHandler.error(errorMessages.join(', '), 400);
    }

    const vehicleId = await VehicleService.create({
      ...result.data,
      owner: user.ref,
      notification_enabled: false
    });

    return ResponseHandler.created({ 
      message: 'Vehicle added successfully', 
      vehicleId 
    });

  } catch (error) {
    console.error('POST Error:', error);
    return ResponseHandler.error('Internal server error');
  }
}

export async function DELETE(request) {
  try {
    const user = await AuthService.verifyUser(request);
    if (!user) return ResponseHandler.error('Unauthorized access', 401);

    const { vehicleId } = await request.json();
    if (!vehicleId) return ResponseHandler.error('Vehicle ID required', 400);

    const vehicle = await VehicleService.getById(vehicleId);
    if (!vehicle) return ResponseHandler.error('Vehicle not found', 404);
    if (vehicle.data().owner.id !== user.ref.id) {
      return ResponseHandler.error('Unauthorized access', 401);
    }

    await VehicleService.delete(vehicleId);
    return ResponseHandler.success({ message: 'Vehicle deleted successfully' });

  } catch (error) {
    console.error('DELETE Error:', error);
    return ResponseHandler.error('Internal server error');
  }
}

export async function PATCH(request) {
  try {
    const user = await AuthService.verifyUser(request);
    if (!user) return ResponseHandler.error('Unauthorized access', 401);

    const { searchParams } = new URL(request.url);
    const vehicleId = searchParams.get('id');
    if (!vehicleId) return ResponseHandler.error('Vehicle ID required', 400);

    const rawData = await request.json();
    const result = VehicleSchema.update.safeParse(rawData);

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message);
      return ResponseHandler.error(errorMessages.join(', '), 400);
    }

    const vehicle = await VehicleService.getById(vehicleId);
    if (!vehicle) return ResponseHandler.error('Vehicle not found', 404);
    if (vehicle.data().owner.id !== user.ref.id) {
      return ResponseHandler.error('Unauthorized access', 401);
    }

    await VehicleService.update(vehicleId, result.data);
    return ResponseHandler.success({ message: 'Vehicle updated successfully' });

  } catch (error) {
    console.error('PATCH Error:', error);
    return ResponseHandler.error('Internal server error');
  }
}