import { NextResponse } from "next/server";

const ResponseHandler = {
    success: (data, status = 200) => NextResponse.json({ data }, { status }),
    error: (message, status = 500) => NextResponse.json({ error: message }, { status }),
    created: (data) => NextResponse.json(data, { status: 201 })
};

export default ResponseHandler