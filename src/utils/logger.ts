import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => { 
  const timestamp = new Date().toISOString(); 
    const { method, url, body, params, headers } = req; 
      console.log(`[${timestamp}] ${method} ${url}\n`, { headers, body, params }, '\n');
      next();
  };  