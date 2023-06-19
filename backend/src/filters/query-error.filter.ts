import { ArgumentsHost, BadRequestException, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { QueryFailedError } from "typeorm";

interface Exception extends QueryFailedError {
  detail: string;
  table: string;
}

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: Exception, host: ArgumentsHost): void {
    const detail = exception.detail;

    if (typeof detail === "string" && detail.includes("already exists")) {
      const messageStart = exception.table.split("_").join(" ") + " with";

      return super.catch(
        new BadRequestException(exception.detail.replace("Key", messageStart)),
        host,
      );
    }

    return super.catch(exception, host);
  }
}
